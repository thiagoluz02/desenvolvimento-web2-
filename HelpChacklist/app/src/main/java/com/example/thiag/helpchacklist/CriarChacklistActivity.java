package com.example.thiag.helpchacklist;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class CriarChacklistActivity extends AppCompatActivity {

    private RequestQueue mVolleyRequest;
    ;
    private EditText mEdtCriarcheck;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_criar_chacklist);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        mVolleyRequest = Volley.newRequestQueue(this);
        //mEdtCriarcheck = (EditText)findViewById(R.id.Criarcheck);
        //mEdtName = (EditText)findViewById(R.id.edtName);
        //mBtDeletar = (Button)findViewById(R.id.btdeletar);

        if (getIntent().hasExtra("key")) {
            //edit = true;
           // music = new Music(getIntent().getStringExtra("user"),
                 //   getIntent().getStringExtra("title"),
                    //getIntent().getStringExtra("key"));
           // mEdtMusic.setText(music.getTitle());
           // mEdtName.setText(music.getUser());

        //    mBtDeletar.setVisibility(View.VISIBLE);

        }

    }


//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.menu_main, menu);
//        return true;
//    }
//
//    @Override
//    public boolean onOptionsItemSelected(MenuItem item) {
//        // Handle action bar item clicks here. The action bar will
//        // automatically handle clicks on the Home/Up button, so long
//        // as you specify a parent activity in AndroidManifest.xml.
//        int id = item.getItemId();
//
//        //noinspection SimplifiableIfStatement
//        //if (id == R.id.action_settings) {
//        // if ( edit ) editaMusica();
//        // else enviaMusica();
//
//        //  return true;
//        //}
//
//        // return super.onOptionsItemSelected(item);
//    }



    public void salvarnovo() {
        // https://chacklist-92352.firebaseio.com/
        try {
            JSONObject obj = new JSONObject();
            obj.put("chacklist", mEdtCriarcheck.getText().toString());
            //obj.put("user", mEdtName.getText().toString());
            JsonObjectRequest json = new JsonObjectRequest(Request.Method.POST,
                    "https://chacklist-92352.firebaseio.com/", obj,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            finish();
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(CriarChacklistActivity.this, "Tente novamente",
                            Toast.LENGTH_SHORT).show();
                }
            }
            );

            mVolleyRequest.add( json );

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
