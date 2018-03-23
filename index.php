<? setcookie("idtovar","tovar",time()+3600,"/");session_start();// ?>
<!DOCTYPE html>
<html>
<head>
	<title>Мій магазин</title>
	<link rel='stylesheet' type='text/css' href='stile.css'>
	
	<link rel="stylesheet" type="text/css" href="http://my.druzi.biz/js/jquery-ui-1.8.18.custom.css">
	<script type="text/javascript" src="http://my.druzi.biz/js/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="http://my.druzi.biz/js/jquery-ui-1.8.18.custom.min.js"></script>
	
</head>
<body>
<script>
function menu_dialog(ob){
	$h=$(window).height()-40;
	obj="#"+ob;
	nam="#"+"text_menu"+ob;
	$(nam).dialog({height:$h,width:615,modal: true});
}
$(document).ready(function(){
	$('li[class=menu]').click(function(){
		name=$(this).attr('id');
		menu_dialog(name);
	});
});
//$('#xxx').dialog({
//height: 100,
//width: 500,
//resizable: false,
//modal: true,
//autoOpen: false,
//position: ['center','top'],
//open: function(){
//	$h=$(window).height();
//	$('#xxx').dialog({height:$h});
//	$('#xxx').html('text');
//},
///close: function(){
//	$('#xxx').html('');
//}
//});

//});
</script>
<?

$url=dirname (__FILE__).'/';
include $url."start.php"; 
$q=mysql_query("SELECT * FROM tovar");

?>

<table align='center'>
<tr>
<td id='center_site'>
<!--<input type="submit" value="dialog" onclick='$("#zagolovok").dialog("open");'>-->
<div id='zagolovok'>
	<table width='100%' border='0'>
		<tr height='120'>
			<td align='center' width='130'><img src='images/logo.jpg' width='160'></td>
			<td width='20'></td>
			<td class='name_site'>Повний кошик</td>
			<!--
			<td align='left' width='170'>
				<ul>
					<li class='menu' id='1'>Групи товарів</li> 
					<li class='menu' id='2'>Про магазин</li> 
					<li class='menu' id='3'>Правила</li> 
					<li class='menu' id='4'>Координати</li> 
					<li class='menu' id='5'>Партнерство</li>
				</ul>
			</td>
			-->
		</tr>
		<tr>
			<td colspan='4'><hr color='green' size='4' width='100%'></td>
			
		</tr>
	</table>
</div>

<form action='p.php' method='POST' width='100%'>
<div  style='top:0px; bottom:0px; left:0px; right:0px;border:0px solid red;padding-left:25px;'>
	<?	
		while($tovar=mysql_fetch_array($q))
		{
			include $url.'show_tovar.php';
		}
	?>
<div width="900"  Align='center' height='40'>
	<div height='15'><hr color='green' size='4' width='100%'></div>
	<input type='submit' name='knopka' value='Зробити замовлення' class='knop'>
</div>
</div>
</form>
</td>
</tr>
</table>

<div id='text_menu1' title='Список груп товарів'>
	Список товарів:<br>
		молоко;
</div>
<div id='text_menu2' title='Про магазин'>
	<? echo '--'.@$_COOKIE['idtovar'].'--'?>
</div>
<div id='text_menu3' title='Правила'>
	
</div>
<div id='text_menu4' title='Координати'>
	<iframe width="560" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com.ua/maps/ms?msa=0&amp;msid=207618378971029922319.0004d27a95953228bc3d0&amp;hl=uk&amp;ie=UTF8&amp;t=m&amp;ll=49.551512,25.605311&amp;spn=0.002436,0.006008&amp;z=17&amp;output=embed"></iframe><br> 
	<p>
		м. Тернопіль, проспект С. Бандери 8, 3 поверх.<br> 
		телефон: (067)208 59 21<br> 
		e-mail: 55517@mail.ru<br>
	</p>
</div>
<div id='text_menu5' title='Партнерство'>

</div>
</body>

</html>