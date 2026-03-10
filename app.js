<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Session Data</title>

  <!-- Bootstrap CSS library (for layout & components) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="../styles/main.css" rel="stylesheet">
</head>

<body class="container py-4">

  <a class="btn btn-link p-0 mb-3" href="./app.html">← Back to App</a>

  <h1 class="fw-bold mb-3">Session Data</h1>
  <p class="text-muted">View temporary session storage data.</p>
  <!-- The sessionOutput element will display the current session data in a formatted way. The clearSessionBtn allows the user to clear the session storage, which will also update the displayed session data accordingly. The data.js script will handle loading the session data and updating the display when the page loads or when the clear button is clicked. -->
  <div class="card mb-3">
    <div class="card-body">
      <pre id="sessionOutput"></pre>
    </div>
  </div>

  <button id="clearSessionBtn" class="btn btn-danger">
    Clear Session
  </button>

  <script src="../scripts/auth.js"></script>
  <script src="../scripts/data.js"></script>

</body>
</html>