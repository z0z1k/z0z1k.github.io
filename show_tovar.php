<table border='0' width='100%' align='center'>
		<tr height='10'>
			<td colspan='3'></td>
		</tr>
		<tr>
				<td width='48' class='check1' >
				<div class='check2'>
					<input class="check3" type="checkbox" name="<?echo't'.$tovar['id'];?>" value="<?echo$tovar['id'];?>">
				<div>
				</td>
				<td width='110'>
					<a><img src="<?echo$tovar['foto']?>" width="100%"></a>
				</td>
				<td>
					
					<div class='name_tovar'> 
						<? echo $tovar['name']; ?>
					</div>
					<div style='color:navy; padding-left:20px;font-weight:700;font-size:11pt; text-align:left;'> 
						№ 3356 &nbsp &nbsp &nbsp &nbsp артикул: 3458234
					</div>
					<div class='opis_tovar'> 
						<? echo $tovar['help']; ?>
					</div>
					<div class='price_tovar'> 
						<? echo $tovar['price']."&nbsp".$tovar['valuta']."&nbsp".$tovar['prefiks']."&nbsp".$tovar['unit']; ?>
					</div>
				</td>
		</tr>
		<tr height='10'>	<td colspan='3' ></td>    </tr>
</table>