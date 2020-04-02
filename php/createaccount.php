<?php
/**
  ** @brief Displays the account creation input options
	** @pre none
	** @post User is able to input the information for their account credentials
	** @return None
  */
  include_once 'header.php';
?>

<form action= "<?php getDirectoryEscape(); ?>register.php" method="post">
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="form-body">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" class="form-control" name="username" placeholder="Username" maxlength="64">
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" name="password" placeholder="Password" maxlength="64">
          </div>
          <div class="form-group">
            <label for="pwd">Confirm Password:</label>
            <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" maxlength="64">
          </div>
        </div>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-default" value="Create Account">Create Account</button><a class="btn btn-default" href="../">Cancel</a>
</form>

<?php
  include_once 'footer.php';
?>
