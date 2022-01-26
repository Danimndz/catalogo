const clearNreloadLogin = (form) => {
  $$(form).clear();
  location.reload();
};

const limpiarLogin = () => {
  $$("loginForm").clear;
};
const logIn = () => {
  let forma = $$("loginForm").getValues();
  console.log(forma);
  webix
    .ajax()
    .get("http://localhost:3000/usuarios")
    .then(function (data) {
      const obj = data.json();
      const user = obj.filter((data) => data.user === forma.user);
      if (user.length > 0) {
        if (user[0].password === forma.password) {
          sessionStorage.setItem("usuario", user[0].user);
          clearNreloadLogin("loginForm");
        } else {
          webix.alert(
            "usuario o contraseña incorrectos, intente nuevamente",
            "alert-warning"
          );
        }
      } else {
        webix.alert("usuario no existe", "alert-warning");
      }
    });
};

var loginForm = {
  view: "form",
  id: "loginForm",
  elements: [
    {
      rows: [
        {
          view: "fieldset",
          label: "BIENVENIDO",
          body: {
            rows: [
              {
                view: "text",
                label: "Usuario",
                name: "user",
                required: true,
              },
              {
                view: "text",
                label: "Password",
                name: "password",
                type: "password",
                required: true,
              },
            ],
          },
        },
        {
          margin: 5,
          cols: [
            {
              view: "button",
              css: "webix_primary",
              label: "Login",
              id: "loginBtn",
              click: function () {
                logIn();
              },
            },
            {
              view: "button",
              css: "webix_alert",
              label: "Cancel",
              height: 0,
              id: "cancelBtn",
              click: limpiarLogin,
            },
          ],
        },
      ],
    },
  ], //elements
}; //fin de forma Login
