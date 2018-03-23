<?
session_start();
$url=dirname (__FILE__).'/';
include $url."start.php";
?>
<!DOCTYPE html>
<html>
<head>
	<title>Мій магазин</title>
	<link rel='stylesheet' type='text/css' href='stile.css'>
	<link rel="stylesheet" type="text/css" href="http://my.druzi.biz/js/jquery-ui-1.8.18.custom.css">
	<script type="text/javascript" src="http://my.druzi.biz/js/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="http://my.druzi.biz/js/jquery-ui-1.8.18.custom.min.js"></script>
</head>
<body class='body_p'>
<script>
function send_data(t)
{
	mulo=$('#mail_k').text();
	$.ajax({
		type:"POST",
		url:"http://u1.it-elit.org/send.php", //!!!! Змінити назву сайту, коли буде інший сайт
		data:({message:t,mail_klient:mulo}),
		success:function(data){
			if(data=='1')
			{
				
			};
			$('#test').dialog({
			width: 400,
			modal: true
			});
		}
	});
}
$(document).ready(function(){
	mes=$('#mulo_table_1').html();
	$('#pp').text(mes);
	text_mesage=$('#pp').text();
	$('#kn').click(function(){
		send_data(text_mesage);
	});
});
</script>
<?
$name_klient=$_POST['name_klient'];
$tel_klient=$_POST['tel_klient'];
$mulo_klient=$_POST['mulo_klient'];
$addres_klient=$_POST['addres_klient'];

$tovar_id=explode(';',$_SESSION['tovar_id']);
echo"<div id='mulo_table_1'>";
echo"<table align='center' border='0' style='border:3px solid red;width:514px;background:white;box-shadow:0px 0px 20px #666666;padding:20px;'>";
echo"<tr>
<th colspan='3' style='text-align:left; color:#999999; font-size:12pt;padding-top:10px;'>Замовлення №345</th>
<th colspan='3' style='text-align:right; padding-top:10px;color:#999999; font-size:12pt;'>".date('d.m.y')."</th></tr>";
echo"<tr><th colspan='5' align='left'><hr size='3' color='red' width='100%'></th></tr>";
echo"<tr><th colspan='5' style='text-align:left; color:blue; font-size:17pt;padding-top:0px;'>".$_SESSION['name_magazin']."</th></tr>";
echo"<tr><th colspan='5' align='left'><hr size='3' color='red' width='100%'></th></tr>";
echo"<tr><th colspan='5' style='text-align:left; color:red; font-size:13pt;padding-bottom:10px;'>Ви замовили:</th></tr>";
echo"<tr><th align='center'>&nbsp№&nbsp</th><th align='left' width='50%'>&nbspНазва товару</th><th align='left'>к-сть</th><th align='left'>ціна</th><th align='left'>сума</th></tr>";
$s=0;
for($i=1;$i<=$_SESSION['count_tovar'];$i++)
{
	$name_pole='tovar'.$i;
	$tovar_count[$i]=$_POST[$name_pole];
	$q=mysql_query("SELECT * FROM tovar WHERE id='".$tovar_id[$i-1]."'");
	$tovar=mysql_fetch_array($q);
		$to_var[$i]['id']=$tovar['id'];;
		$to_var[$i]['name']=$tovar['name'];
		$to_var[$i]['help']=$tovar['help'];
		$to_var[$i]['price']=$tovar['price'];
		$to_var[$i]['valuta']=$tovar['valuta'];
		$to_var[$i]['kurs']=$tovar['kurs'];
		$to_var[$i]['prefiks']=$tovar['prefiks'];
		$to_var[$i]['unit']=$tovar['unit'];
		$to_var[$i]['foto']=$tovar['foto'];
		$to_var[$i]['suma']=$to_var[$i]['price']*$tovar_count[$i];
		$s=$s+$to_var[$i]['suma'];
		printf("
		<tr>
			<td align='center'>&nbsp%s&nbsp</td><td>&nbsp%s</td><td>%s</td><td>%s</td><td>%s</td>
		</tr>
		",$to_var[$i]['id'],$to_var[$i]['name'],$tovar_count[$i],$to_var[$i]['price'],$to_var[$i]['suma']);
		
};
echo"<tr><th colspan='4' style='text-align:right;color:blue;'>Всього до оплати:</th><th style='text-align:left;color:blue;'>".$s."грн.</th></tr>";
echo"<tr><th colspan='5' style='text-align:left; color:red; font-size:13pt;padding-bottom:10px;'>Ваші контактні дані:</th></tr>";
echo"<tr><td></td><td style='text-align:left'><b>Ім'я:</b></td><td colspan='3'>".$name_klient."</td></tr>";
echo"<tr><td></td><td style='text-align:left'><b>Телефон:</b></td><td colspan='3'>".$tel_klient."</td></tr>";
echo"<tr><td></td><td style='text-align:left'><b>e-mail:</b></td><td colspan='3' id='mail_k'>".$mulo_klient."</td></tr>";
echo"<tr><td></td><td style='text-align:left'><b>адреса доставки:</b></td><td colspan='3'>".$addres_klient."</td></tr>";
echo"</table>";
echo"</div>"
?>
<div align='center' id='kn' class='knop'>відправити</div>
<p align='center' id='pp'></p>
<div id='test'>
<p style='text-align:justify; color:green;padding:20px;'>Дані успішно вілправлені продавцю! Копія цього замовлення відправлена на вашу електронну пошту.<br></p>
<a href='<? echo $_SESSION['golovna']; ?>' class='knop' >До магазину</a> <br>
</div>








