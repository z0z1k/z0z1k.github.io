 <?
	$_SESSION['golovna']='http://u1.it-elit.org';
	$_SESSION['name_magazin']='Наш магазин';
	$host = "itelit.mysql.ukraine.com.ua";
	$user = "itelit_u1";
	$password = "123qwerty123";
	$db="itelit_u1";
	
	if (!mysql_connect($host, $user, $password))
			{
				echo "<h2>Помилка з*єднення з сервером</h2>";
				exit;
			};
	mysql_select_db($db);
	
	mysql_query("SET NAMES 'utf8' COLLATE 'utf8_general_ci'"); 
	mysql_query("SET CHARACTER SET 'utf8'");
	
?>