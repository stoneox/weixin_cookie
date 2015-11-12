
	<?php
		
		//session_start();
		//error_reporting(E_ALL & ~E_NOTICE);
		$text = $_POST["text"];
		$name = $_POST["name"];
		$img = $_POST["img"];
		//$name = $_GET["name"];

		$con = mysql_connect("localhost","root","qwe123");						//数据库登陆
		if (!$con) {
			die('condle connect mysql'.mysql_error());
		}
		mysql_select_db('web',$con);											//数据库名称
		$sql = "insert into talk (name,text,img) values ('$name','$text','$img')";			//注意修改表名称

		if (!mysql_query($sql,$con)) {
			die('Error'.mysql_error());
		}

		/*$rel = mysql_query("SELECT * FROM text");
		while($row = mysql_fetch_array($rel))
		{
			echo $row['name'].":".$row['text'];
			echo "<br />";
		}*/

		mysql_close($con);
	?>