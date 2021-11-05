package de.hft.cordova.mifare;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NfcAdapter;
import android.nfc.NfcManager;
import android.nfc.tech.MifareClassic;
import org.apache.cordova.*;
import org.json.JSONException;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;

public class StudentID extends CordovaPlugin {
  private MifareClassic tag;
  private CallbackContext tagFoundCallbackContext;

  @Override
  public void onNewIntent(Intent intent) {
    if (intent.getAction() == NfcAdapter.ACTION_TAG_DISCOVERED || intent.getAction() == NfcAdapter.ACTION_TECH_DISCOVERED) {
      tag = MifareClassic.get(intent.getParcelableExtra(NfcAdapter.EXTRA_TAG));
      if (tagFoundCallbackContext != null && tag != null) {
        tagFoundCallbackContext.success();
      }
    }
  }

  @Override
  public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
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
        new String[][]{new String[]{MifareClassic.class.getName()}});
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
          if (!tag.isConnected()) {
            tag.connect();
          }
          // Just use Mifare DesFire ;)
          tag.authenticateSectorWithKeyB(1, new byte[]{(byte) 0xac, (byte) 0x87, (byte) 0xbe, (byte) 0x83, (byte) 0x92, 0x4e});
          byte[] balanceBlock = tag.readBlock(4);
          JSONObject response = new JSONObject();
          double balance = (balanceBlock[0] | balanceBlock[1] * 256) / 100.0;
          response.put("balance", balance);
          callbackContext.success(response);
        } catch (IOException e) {
          callbackContext.error(e.toString());
        }
      });
      return true;
    }
    return false;
  }
}
