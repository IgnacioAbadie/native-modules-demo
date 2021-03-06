package com.native_modules_demo;
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.icu.text.SimpleDateFormat;
import android.os.Build;
import android.os.Environment;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;


public class ScreenshotHelperModuleManager extends ReactContextBaseJavaModule {

    // CONSTRUCTOR WITH REACT CONTEXT
    public ScreenshotHelperModuleManager (ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // HERE MODULE NAME!  <--- USE SAME THAT iOS ;)
    @Override
    public String getName() {
        return "ScreenshotHelperModule";
    }




    // HERE PUBLIC FOR JS
    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void takeScreenshot(Integer x, Integer y, Callback callback) {
        Activity activity = getCurrentActivity();;
        View view = activity.getWindow().getDecorView();
        view.setDrawingCacheEnabled(true);
        view.buildDrawingCache();
        Bitmap b1 = view.getDrawingCache();
        Rect frame = new Rect();
        activity.getWindow().getDecorView().getWindowVisibleDisplayFrame(frame);
        int statusBarHeight = frame.top;

        int width = activity.getWindowManager().getDefaultDisplay().getWidth();
        int height = activity.getWindowManager().getDefaultDisplay().getHeight();

        int screenHeight = height - statusBarHeight - 310;
        int squareWidth = width / 3;
        int squareHeight = screenHeight / 3;

        Bitmap b = Bitmap.createBitmap(b1, squareWidth * x, 147 + statusBarHeight + squareHeight * y, squareWidth, squareHeight);
        view.destroyDrawingCache();
        this.savePic(b);
        Toast toast = Toast.makeText(getReactApplicationContext(),
                "Screenshot taken, check your gallery",
                Toast.LENGTH_SHORT);

        toast.show();
        callback.invoke(true);
    }



    // HERE PRIVATE FOR JS
    public Bitmap processView(View view) {
        view.setDrawingCacheEnabled(true);
        view.buildDrawingCache();
        return view.getDrawingCache();
    }


    // HERE PRIVATE FOR JS
    @RequiresApi(api = Build.VERSION_CODES.N)
    public void savePic(Bitmap b) {
        try {
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String imageFileName = "paradise" + timeStamp + "_";
            File storageDir = android.os.Environment.getExternalStorageDirectory();
            File image = File.createTempFile(
                    imageFileName,  /* prefix */
                    ".png",         /* suffix */
                    storageDir      /* directory */
            );
            FileOutputStream fos;
            fos = new FileOutputStream(image.getAbsolutePath());
            b.compress(Bitmap.CompressFormat.PNG, 90, fos);
            fos.flush();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
