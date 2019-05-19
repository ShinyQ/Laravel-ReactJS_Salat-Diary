<html>
  <head>
      <title>Konfirmasi Email</title>
      <style>
      .button {
          background-color: #56d2b7; /* Green */
          border: none;
          color: white!important;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }

      .p-font{
        font-size: 16px;
        color:black;
      }
      </style>
  </head>

  <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666; background:white; text-decoration: none;">

    <div class="container">
      <div class="card">
        <div class="card-body">
          <center>
            <img src="{{ $message->embed(public_path() . '/img/logo.png') }}" width="160px;"/>
            <h2>Assalamualaikum, {{$user['name']}}</h2>
            <p class="p-font">Alamat Email Kamu : {{$user['email']}}, Telah Berhasil Diregistrasi, <br /> Klik Link Dibawah Untuk Melakukan Verifikasi Email</p>
            <a class="button" href="http://localhost:3000/verifikasi/{{ $user->token }}">Verifikasi Email</a><br />
          </div>
          </center>
      </div>
    </div>
  </body>
</html>
