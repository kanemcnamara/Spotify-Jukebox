<?php

$client_id = '1d866aedaaa94d53bb7909d33c324bf4'; 
$client_secret = '0a405aef49af4519a99851e1139b7fef'; 
$redirect_uri = 'https://request.kane.network/callback.html';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,            'https://accounts.spotify.com/api/token' );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST,           1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,     'grant_type=client_credentials' ); 
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret))); 

$result=curl_exec($ch);
echo $result;

?>