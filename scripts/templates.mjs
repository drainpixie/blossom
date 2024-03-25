export const POST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body id="#app">
    <h1>
      <h1>{{title}}</h1>
      <p>{{date}}</p>
    </h1>

    {{content}}
    
    <script type="module" src="./src/index.js"></script>
   </body>
<html>
`;
