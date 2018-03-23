<?

$z1=$_POST['z1'];
$z2=$_POST['z2'];
$opr=$_POST['opr'];
if($opr=="+")
{
$r=$z1+$z2;
}
if($opr=="-")
{
$r=$z1-$z2;
}
if($opr=="*")
{
$r=$z1*$z2;
}
if($opr=="/")
{
$r=$z1/$z2;
}
echo $r;

?>