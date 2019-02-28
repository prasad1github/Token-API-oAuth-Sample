app.service('loginservice', function ($http) {
    this.register = function (userInfo) {
        debugger;
        var resp = $http({
            url: "/api/Account/Register",
            method: "POST",
            contentType: "application/json",
            data: userInfo
        });
        debugger;
        return resp;
    };

    this.login = function (userlogin) {
        debugger;
        var resp = $http({
            url: "/TOKEN",
            method: "POST",
           
            data: $.param({ grant_type: 'password', username: userlogin.username, password: userlogin.password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        debugger;
        return resp;
    };
});

//controller
app.controller('logincontroller', function ($scope, loginservice) {
    //Scope Declaration
    $scope.responseData = "";

    $scope.userName = "";

    $scope.userRegistrationEmail = "";
    $scope.userRegistrationPassword = "";
    $scope.userRegistrationConfirmPassword = "";

    $scope.userLoginEmail = "";
    $scope.userLoginPassword = "";

    $scope.accessToken = "";
    $scope.refreshToken = "";
    //Ends Here
    debugger;
    //Function to register user
    $scope.registerUser = function () {
        debugger;
        $scope.responseData = "";

        //The User Registration Information
        var userRegistrationInfo = {
            Email: $scope.userRegistrationEmail,
            Password: $scope.userRegistrationPassword,
            ConfirmPassword: $scope.userRegistrationConfirmPassword
        };

        var promiseregister = loginservice.register(userRegistrationInfo);

        promiseregister.then(function (resp) {
            alert('success');
            $scope.responseData = "User is Successfully";
            $scope.userRegistrationEmail = "";
            $scope.userRegistrationPassword = "";
            $scope.userRegistrationConfirmPassword = "";
        }, function (err) {
            alert(err.status);
            $scope.responseData = "Error " + err.status;
        });
    };


    $scope.redirect = function () {
        window.location.href = '/Employee/Index';
    };

    //Function to Login. This will generate Token 
    $scope.login = function () {
        //This is the information to pass for token based authentication
        var userLogin = {
            grant_type: 'password',
            username: $scope.userLoginEmail,
            password: $scope.userLoginPassword
        };

        var promiselogin = loginservice.login(userLogin);

        promiselogin.then(function (resp) {
            debugger;

            $scope.userName = resp.data.userName;
            //Store the token information in the SessionStorage
            //So that it can be accessed for other views
            sessionStorage.setItem('userName', resp.data.userName);
            sessionStorage.setItem('accessToken', resp.data.access_token);
            sessionStorage.setItem('refreshToken', resp.data.refresh_token);
            sessionStorage.setItem('sessionCon', "data source=(LocalDB)\v11.0;initial catalog=bbbb2;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework");
            
            debugger;
            window.location.href = '/Employee/Index';
        }, function (err) {

            $scope.responseData = "Error " + err.status;
        });

    };
});