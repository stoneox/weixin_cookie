<?php
$timeout = 30;
$start_time = time();

function get_msg(){
        $con = mysql_connect("localhost", "root", "qwe123");
        if (!$con)
          {
          die('Could not connect: ' . mysql_error());
          }

        $db_selected = mysql_select_db("web",$con);

        $sql = "SELECT * FROM talk";
        $result = mysql_query($sql,$con);
        return mysql_num_rows($result);
        mysql_close($con);
}
// get message
$last_msg = get_msg();
// start the loop
while (true){
    // get current time
    $current_time = time();
    // check if we are timed out
    if ($current_time - $start_time > $timeout){
       
        break;
    }
    // get latest message
    $current_msg = get_msg();
    if ($last_msg != $current_msg){
        $length = $current_msg - $last_msg;
        $con = mysql_connect("localhost", "root", "qwe123");
        if (!$con)
          {
          die('Could not connect: ' . mysql_error());
          }

        $db_selected = mysql_select_db("web",$con);

        $sql = "SELECT * FROM talk order by id desc limit $length";
        $get = mysql_query($sql);
        while($row = mysql_fetch_array($get))
              {
                echo $row["name"];
                echo ",";
                echo $row['text'];
                echo ",";
                echo $row['img'];
                echo ";";
              }
        mysql_close($con);
        break;
    }
    sleep(1);
}