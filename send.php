<?
session_start();
$url=dirname (__FILE__).'/';
include $url."start.php";

$admin_mail = '55517@mail.ru';
$to = '55517@mail.ru'.", ".$_POST['mail_klient'];

$name = $_SESSION['name_magazin'];
$subject = 'ВАШЕ ЗАМОВЛЕННЯ.';
$message = $_POST['message'];

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: ".$name." <".$admin_mail.">\r\n";
$headers .= "Cc: ".$admin_mail."\r\n";
$headers .= "Bcc: ".$admin_mail."\r\n";
$headers .= "Subject: ".$subject;

$ok=mail($to, $subject, $message, $headers);

echo $ok;

?>