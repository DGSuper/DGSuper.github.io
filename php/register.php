<?php
/**
  ** @brief Allows the user to create a new account
	** @pre successful connection to database
	** @post New account is created given that the user provides a valid password
	** @return success message if the account is created
  */

  include_once 'header.php';

  $username = trim($_POST["username"]);
  $password = $_POST['password'];
  $confirm_password = $_POST['confirm_password'];
  $username_err = $password_err = $confirm_password_err = "";

  if($_SERVER["REQUEST_METHOD"] == "POST"){
      if(empty($username) || strtolower($username) == "tie"){
          $username_err = "Please enter a valid username.";
      }
      else {
        if(strlen($password) < 8){
          $password_err = "Password must have at least 8 characters.";
        }
        else {
          if($password != $confirm_password){ //Both passwords must be the same string value
              $confirm_password_err = 'Passwords must match.';
          }
          else {
            if($link->connect_errno){
              printf("Connect failed: %s\n", $link->connect_error);
              exit();
            }
            $check = mysqli_query($link, "SELECT * FROM GameUsers WHERE username='$username'");
      			$found = mysqli_num_rows($check);
            if($found > 0) { //Check database for existing user with the same name
              $username_err .= "That username already exists. Try again.";
            }
          }
        }
      }

      if(empty($username_err) && empty($password_err) && empty($confirm_password_err)) {

        $queryGameUsers = "INSERT IGNORE INTO GameUsers(username, password) VALUES('$username', '$password')";
        if ($result = $link->query($queryGameUsers)) {
          echo "<h3>New user ";
        }
        $queryProfiles = "INSERT IGNORE INTO Profiles(username, wins, draws, losses) VALUES('$username', '0', '0', '0')";
        if ($result = $link->query($queryProfiles)) {
          echo "created!</h3>";
        }
        echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
        $result->free(); // free result set
        $link->close(); /*close connection */
      }
      else{
        echo "<h3>".$username_err.$password_err.$confirm_password_err."</h3>";
        echo "<a href=\"createaccount.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">Try again</button></a>";
      }
  }
  echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";

  include_once 'footer.php';
?>
