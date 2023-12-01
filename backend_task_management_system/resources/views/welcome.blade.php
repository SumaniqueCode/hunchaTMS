<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TSM</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="container">
  <?php
    use App\Models\User;
    $users = User::orderBy('id', 'asc')->get();
    ?>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

@error('message')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror

<!-- Nav tabs -->
<ul class="nav nav-tabs" id="navId" role="tablist">
  <li class="nav-item">
    <a href="#tab1Id" class="nav-link active" data-bs-toggle="tab" aria-current="page">Active</a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#tab2Id">Action</a>
      <a class="dropdown-item" href="#tab3Id">Another action</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#tab4Id">Action</a>
    </div>
  </li>
  <li class="nav-item" role="presentation">
    <a href="#tab5Id" class="nav-link" data-bs-toggle="tab">Another link</a>
  </li>
  <li class="nav-item" role="presentation">
    <a href="#" class="nav-link disabled" data-bs-toggle="tab">Disabled</a>
  </li>
</ul>

<!-- Tab panes -->
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="tab1Id" role="tabpanel"></div>
  <div class="tab-pane fade" id="tab2Id" role="tabpanel"></div>
  <div class="tab-pane fade" id="tab3Id" role="tabpanel"></div>
  <div class="tab-pane fade" id="tab4Id" role="tabpanel"></div>
  <div class="tab-pane fade" id="tab5Id" role="tabpanel"></div>
</div>

<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->
<script>
  var triggerEl = document.querySelector('#navId a')
  bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name
</script>

    <form method="post" action="http://localhost:8000/api/addUsers" class="form mb-3">
      @csrf
      <h1>Form Format</h1>
        <div class="mb-3">
          <label for="" class="form-label">First Name</label>
          <input type="text" class="form-control" name="firstName" id="" placeholder="Enter user first name">
        </div>
          <div class="mb-3">
            <label for="" class="form-label">Last Name</label>
            <input type="text" class="form-control" name="lastName" id="" placeholder="Enter user last name">
          </div>
        <div class="mb-3">
          <label for="" class="form-label">Email</label>
          <input type="email" class="form-control" name="email" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com">
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Address</label>
            <input type="text" class="form-control" name="address" id="" placeholder="Enter user address">
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Gender</label>
            <select name="gender" id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Phone</label>
            <input type="phone" class="form-control" name="phone" id="" placeholder="+977 9800000000">
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Password</label>
            <input type="password" class="form-control" name="password" id="" placeholder="Enter user password">
          </div>
        <button class="btn btn-primary" type="submit">SUBMIT</button>
    </form>

    <div class="table-responsive-sm">
      <table class="table table-primary text-center">
        <thead>
          <tr class="">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($users as $user)

          <tr class="">
            <td scope="row">{{$user->firstName}}</td>
            <td>{{$user->email}}</td>
            <td><a class="mx-2 mb-1 btn btn-primary" href="http://localhost:8000/api/editDetails/{{$user->id}}"><i class="fa fa-pencil"> Edit </i></a>
              <a class="btn btn-danger" href="http://localhost:8000/api/deleteData/{{$user->id}}"><i class="text-white fa-solid fa-trash" style="color: #fa0000;"> Delete </i></a>
          </tr>

          @endforeach
        </tbody>
      </table>
    </div>
    
</body>
</html>