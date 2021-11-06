package de.hft.cordova.studentid;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NfcAdapter;
import android.nfc.NfcManager;
import android.nfc.Tag;
import android.nfc.tech.IsoDep;
import android.nfc.tech.MifareClassic;
import android.util.Log;
import org.apache.cordova.*;
import org.json.JSONException;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Arrays;

public class StudentID extends CordovaPlugin {
  private Tag tag;
  private CallbackContext tagFoundCallbackContext;

  @Override
  public void onNewIntent(Intent intent) {
    if (intent.getAction() == NfcAdapter.ACTION_TAG_DISCOVERED || intent.getAction() == NfcAdapter.ACTION_TECH_DISCOVERED) {
      tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
      if (tagFoundCallbackContext != null && tag != null) {
        tagFoundCallbackContext.success();
      }
    }
  }

  @Override
  public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
    Activity activity = this.cordova.getActivity();
    NfcManager manager = (NfcManager) activity.getSystemService(Context.NFC_SERVICE);
    if (action.equals("subscribe")) {
      NfcAdapter adapter = manager.getDefaultAdapter();
      if (adapter == null) {
        callbackContext.error("No Adapter");
        return true;
      }

      IntentFilter intentFilter = new IntentFilter();
      intentFilter.addAction(NfcAdapter.ACTION_TAG_DISCOVERED);
      intentFilter.addAction(NfcAdapter.ACTION_TECH_DISCOVERED);

      this.tagFoundCallbackContext = callbackContext;

      adapter.enableForegroundDispatch(activity,
        PendingIntent.getActivity(activity, 0,
          new Intent(activity, activity.getClass()), 0),
        new IntentFilter[]{intentFilter},
        new String[][]{
          new String[]{MifareClassic.class.getName()},
          new String[]{IsoDep.class.getName()}
        });
      return true;
    } else if (action.equals("unsubscribe")) {
      NfcAdapter adapter = manager.getDefaultAdapter();
      if (adapter != null) {
        adapter.disableForegroundDispatch(activity);
        tagFoundCallbackContext = null;
        tag = null;
      }
      return true;
    } else if (action.equals("read")) {
      this.cordova.getThreadPool().execute(() -> {
        try {
          if (tag == null) {
            throw new IOException("Tag disconnected");
          }
          double balance;
          MifareClassic mifareClassicTag = MifareClassic.get(tag);
          if (mifareClassicTag == null) {
            IsoDep mifareDesfireTag = IsoDep.get(tag);
            if (!mifareDesfireTag.isConnected()) {
              mifareDesfireTag.connect();
            }
            // Select Application
            byte[] response = mifareDesfireTag.transceive(new byte[]{0x5A, 0x5F, (byte) 0x84, 0x15});
            if (response.length != 1 || response[0] != 0) {
              throw new IOException("Could not select app: " + Arrays.toString(response));
            }
            // Get Value
            response = mifareDesfireTag.transceive(new byte[]{(byte) 0x6C, 0x01});
            if (response.length < 5 || response[0] != 0) {
              throw new IOException("Could not get value: " + Arrays.toString(response));
            }
            balance = ((response[1] & 0xFF) |
              ((response[2] & 0xFF) << 8) |
              ((response[3] & 0xFF) << 16) |
              ((response[4] & 0xFF << 24))) / 1000.0;
          } else {
            if (!mifareClassicTag.isConnected()) {
              mifareClassicTag.connect();
            }
            // Just switch to Mifare DesFire ;)
            mifareClassicTag.authenticateSectorWithKeyA(1, new byte[]{(byte) 0xac, (byte) 0x87, (byte) 0xbe, (byte) 0x83, (byte) 0x92, 0x4e});
            byte[] balanceBlock = mifareClassicTag.readBlock(4);
            balance = ((balanceBlock[0] & 0xFF) | (balanceBlock[1] & 0xFF) << 8) / 100.0;
          }
          JSONObject response = new JSONObject();
          response.put("balance", balance);
          callbackContext.success(response);
        } catch (IOException | JSONException e) {
          Log.e("StudentID", "Could not read Tag", e);
          callbackContext.error(e.toString());
        }
      });
      return true;
    }
    return false;
  }
}
