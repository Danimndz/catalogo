const clearNreloadLogin = (form) => {
  $$(form).clear();
  location.reload();
};

const limpiarLogin = () => {
  $$("loginForm").clear;
};
const logIn = () => {
  let forma = $$("loginForm").getValues();
  webix
    .ajax()
    .post("http://localhost:3000/login", forma)
    .then(function (data) {
      const obj = data.json();
      sessionStorage.setItem("auth", obj);
      clearNreloadLogin("loginForm");
    })
    .catch(() => {
      webix.alert(
        "usuario o contraseña incorrectos, intente nuevamente",
        "alert-warning"
      );
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
                name: "name",
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
