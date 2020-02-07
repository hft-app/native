package de.hft.cordova.mifare;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NfcAdapter;
import android.nfc.NfcManager;
import android.nfc.tech.MifareClassic;
import android.os.Bundle;
import android.util.Base64;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class Mifare extends CordovaPlugin {
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
        if (action.equals("subscribeTag")) {
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
        } else if (action.equals("unsubscribeTag")) {
            NfcAdapter adapter = manager.getDefaultAdapter();
            if (adapter != null) {
                adapter.disableForegroundDispatch(activity);
                tagFoundCallbackContext = null;
                tag = null;
            }
            return true;
        } else if (action.equals("auth")) {
            this.cordova.getThreadPool().execute(() -> {
                try {
                    if (!tag.isConnected()) {
                        tag.connect();
                    }
                    for (int i = 0; i < data.length(); i++) {
                        JSONObject obj = data.getJSONObject(i);
                        int sector = obj.getInt("sector");
                        String keyA = obj.optString("keyA");
                        if (keyA != "") {
                            tag.authenticateSectorWithKeyA(sector, Base64.decode(keyA, 0));
                        }

                        String keyB = obj.optString("keyB");
                        if (keyB != "") {
                            tag.authenticateSectorWithKeyB(sector, Base64.decode(keyB, 0));
                        }
                    }
                    callbackContext.success();
                } catch (IOException | JSONException e) {
                    callbackContext.error(e.toString());
                }
            });
            return true;
        } else if (action.equals("read")) {
            this.cordova.getThreadPool().execute(() -> {
                try {
                    if (!tag.isConnected()) {
                        tag.connect();
                    }
                    JSONObject response = new JSONObject();
                    for (int i = 0; i < data.length(); i++) {
                        int blockIndex = data.getInt(i);
                        byte[] block = tag.readBlock(blockIndex);
                        response.put(Integer.toString(blockIndex), Base64.encodeToString(block, Base64.NO_WRAP));
                    }
                    callbackContext.success(response);
                } catch (IOException | JSONException e) {
                    callbackContext.error(e.toString());
                }
            });
            return true;
        }
        return false;
    }
}
