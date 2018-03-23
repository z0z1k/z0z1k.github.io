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
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
</head>
<body class='body_p'>
<form action='mulo.php' method='POST' id='mulo'>
<script>
function text_number()
{
	i=1; nn="tovar"+i;
	$('#table_tovar input[type=text]').each(function(){
		$(this).attr('id',i);
		$(this).attr('name',nn);
		i=i+1; 
		nn='tovar'+i;
	});
};
$(document).ready(function(){
	text_number();
	t=$('input[type=text]').keyup(function(){
		t=$(this).val();
		x='s_um'+$(this).attr('id');
		y='price'+$(this).attr('id');
		index_sum="td[id="+x+"]";
		index_price="td[id="+y+"]";
		price=$(index_price).text();
		
		sum=parseFloat(t)*parseFloat(price);
		$(index_sum).text(sum);
		f_sum=0;
		$('td[id*=s_um]').each(function(){
			z=$(this).text();			
			z=parseFloat(z);			
			f_sum=f_sum+z*1;
		});
		f_sum=f_sum+'';
		$('#ful_sum').text(f_sum);
	});	
	
});
</script>

<?
$url=dirname (__FILE__).'/';
include $url."start.php"; 
$q=mysql_query("SELECT * FROM tovar");

$i=1;

echo"<table  id='table_tovar' class='zamovleno' border='0'  cellpadding='9' cellspacing='0'>";
echo"<tr align='left' style=' background:green; color:white;font-size:18pt;padding-top:50px'><th>Вами замовлено</th><th>к-сть</th><th>од.</th><th>ціна</th><th>сума</th>  </tr>";
$s=0;
$_SESSION['tovar_id']="";
$_SESSION['count_tovar']=0;
while ($tovar=mysql_fetch_array($q))
{
	$t="t".$tovar['id'];
	if ($_POST[$t]!='')
	{
		$to_var[$i]['id']=$_POST[$t];
		$to_var[$i]['name']=$tovar['name'];
		$to_var[$i]['help']=$tovar['help'];
		$to_var[$i]['price']=$tovar['price'];
		$to_var[$i]['valuta']=$tovar['valuta'];
		$to_var[$i]['kurs']=$tovar['kurs'];
		$to_var[$i]['prefiks']=$tovar['prefiks'];
		$to_var[$i]['unit']=$tovar['unit'];
		$to_var[$i]['foto']=$tovar['foto'];
		$to_var[$i]['suma']=$to_var[$i]['price'];
		$_SESSION['tovar_id'].=$to_var[$i]['id'].';';
		echo"<tr>";
		
			echo"<td>";
				echo $to_var[$i]['name'];
			echo"</td>";
			
			echo"<td>";
				echo"<input type='text' name='a' value='1' size='2'>";
			echo"</td>";
			
			echo"<td>";
				echo $to_var[$i]['unit'];
			echo"</td>";
			echo"<td id='price".$i."'>";
				echo $to_var[$i]['price'];
			echo"</td>";
			echo"<td id='s_um".$i."'>".$to_var[$i]['suma']."</td>";
			$s=$s+$to_var[$i]['suma'];
			
		echo"</tr>";
		
		
		$i=$i+1;
	}
}
$_SESSION['count_tovar']=$i-1;
echo"</table>";
echo"<div align='center'  class='do_oplaty'> До оплати: <strong id='ful_sum'>".$s."</strong>".$to_var[1]['valuta']."</div>";
?>


	<div id='mulo_text'>
		Бажаєте придбати цей товар? Заповніть дані вказані нижче.
		Ваші дані будуть відправлені продавцю. 
		Він звами зв'яжеться по телефону і обговорить питання оплати і доставки вибраного вами товару.
	</div>
	<table class='forma' cellspacing='0'border='0'>
	<tr>
		<td>Ваше ім'я</td>
		<td><input class='t1'type='text' name='name_klient' size='47'></td>
	</tr>
	<tr>
		<td>№ телефону</td>
		<td><input class='t1'type='text' name='tel_klient' size='47'></td>
	</tr>
	<tr>
		<td>електронна пошта</td>
		<td><input class='t1'type='text' name='mulo_klient' size='47'></td>
	</tr>
	<tr>
		<td>адреса доставки</td>
		<td><textarea name='addres_klient' cols='37' rows='2'></textarea></td>
	</tr>
	<tr>
		<td align='left'><a href='<? echo $_SESSION["golovna"] ?>' class="k3">Повернутись</a></td>
		<td  align='right'><input  class="k2" type='submit' name='k' value='Замовити товар'></td>
	</tr>
	
	</table>
</form>

</body>
</html>



















