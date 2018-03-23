
<?

header("Content-Type: text/html; charset=utf-8");

$ksva_klient_name=$_POST['ksva_klient_name'];
$ksva_klient_tel=$_POST['ksva_klient_tel'];
$ksva_klient_text=$_POST['ksva_klient_text'];
$ksva_klient_kapcha=$_POST['ksva_klient_kapcha'];
$ksva_klient_knopka=$_POST['ksva_klient_knopka'];


$admin_mail = "admin@gurt.it";

$to = "55517@mail.ru";

$subject = "Замовлення клієнта ".$ksva_klient_name;

$message = "Клієнт -\n $ksva_klient_name \n Телефон - \n $ksva_klient_tel \n Текст замовлення - \n $ksva_klient_text";





$f=0;

if ($ksva_klient_name=="" or $ksva_klient_tel=="" or $ksva_klient_text=="" )  {
	
	$f=1;

	echo("<p align='center' style='color:orange;font-size:40px;'><b>Ви не ввели: </b>");
	
	if ($ksva_klient_name==""){
		echo("<br><b style='color:orange;font-size:20px;'>Iмені</b>");
	};

	if ($ksva_klient_tel==""){
		echo("<br><b style='color:orange;font-size:20px;'>Телефону</b>");
	
	};

	if ($ksva_klient_text==""){
		echo("<br><b style='color:orange;font-size:20px;'>Тексту вашого замовлення</b>");
	
	};
};


if ($ksva_klient_kapcha !="451317" and $f = 0 ){
	
	
	$f=1;	
	
	echo("<p align='center'><b style='color:red;font-size:30px;'>У вас не вірно введене число на картинці!</b>");
	
};


if ($f != 1){
	mail($to, $subject, $message);
	echo("<p  align='center' style='color:green;font-size:20px;' >  ваше повідомлення відправлене</p>"); 
};

echo("<p  align='center'> <a href='body-ksva.html' style='color:blue;font-size:18px;' target='body'>   повернутись</a></p>"); 




?>