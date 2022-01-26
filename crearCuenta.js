const clearNreloadCrearCuenta = (form) => {
  $$(form).clear();
  location.reload();
};

const limpiarCrearCUenta = () => {
  $$("crearCuentaForm").clear();
};
const crearUsuario = () => {
  let forma = $$("crearCuentaForm").getValues();
  if (/^[a-zA-Z]+$/.test(forma.user)) {
    if (/^[a-zA-Z0-9]+$/.test(forma.password)) {
      webix
        .ajax()
        .post("http://alumnos01.enlacenet.net:8005/crearUsuario", forma)
        .then(function (data) {
          const obj = data.json();
          if (obj.res_) {
            webix.alert("Usuario creado", "alert-warning");
          } else {
            webix.alert("Este usuario ya existe", "alert-warning");
          }
        });
    } else {
      webix.alert(
        "Contraseña no valida. Use solamente letras y numeros",
        "alert-warning"
      );
    }
  } else {
    webix.alert("Usuario no valido. Use solamente letras", "alert-warning");
  }
};

var crearCuentaForm = {
  view: "form",
  id: "crearCuentaForm",
  elements: [
    {
      rows: [
        {
          view: "fieldset",
          label: "CREA TU CUENTA",
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
              label: "Crear Usuario",
              id: "crearUsuarioBtn",
              click: function () {
                if (this.getFormView().validate()) {
                  crearUsuario();
                }
              },
            },
            {
              view: "button",
              css: "webix_alert",
              label: "Cancel",
              height: 0,
              id: "cancelCrearUsuarioBtn",
              click: limpiarCrearCUenta,
            },
          ],
        },
        // {
        //   view: "label",
        //   label: "USUARIO CREADO",
        //   align: "center",
        //   hidden: true,
        // },
      ],
    },
  ],
};
