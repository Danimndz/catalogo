const limpiarCuentas = () => {
  $$("cuentasForm").clear();
  $$("editBtnC").hide();
  $$("saveBtnCta").show();
  $$("deleteBtnC").hide();
};

const deleteC = () => {
  let accounToDelete = $$("cuentasForm").getValues();
  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .del(`http://localhost:3000/usuarios/${accounToDelete.id}`)
    .then((res) => {
      $$("tablaCuenta").clearAll();
      $$("tablaCuenta").parse(res.json());
      $$("deleteBtnC").hide();
      $$("saveBtnCta").show();
      $$("editBtnC").hide();
    });
};

const editC = () => {
  let accounToEdit = $$("cuentasForm").getValues();

  webix
    .ajax()
    .headers({ Authorization: `Bearer ${sessionStorage.getItem("auth")}` })
    .put(`http://localhost:3000/usuarios/${accounToEdit.id}`, accounToEdit)
    .then((res) => {
      $$("tablaCuenta").clearAll();
      $$("tablaCuenta").parse(res.json());
      $$("deleteBtnC").hide();
      $$("saveBtnCta").show();
      $$("editBtnC").hide();
    });
};

const onsubmitCuenta = () => {
  const newCuenta = $$("cuentasForm").getValues();

  if (/^[a-zA-Z]+$/.test(newCuenta.user)) {
    if (/^[a-zA-Z0-9]+$/.test(newCuenta.password)) {
      webix
        .ajax()
        .headers({
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
        })
        .post("http://localhost:3000/usuarios", newCuenta)
        .then((content) => {
          webix.alert("Usuario creado", "alert-warning");
          $$("tablaCuenta").clearAll();
          $$("tablaCuenta").parse(content.json());
        })
        .catch(() => {
          webix.alert("Este usuario ya existe", "alert-warning");
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

const formCuentas = {
  view: "form",
  id: "cuentasForm",
  elements: [
    {
      rows: [
        {
          view: "text",
          label: "Usuario",
          name: "name",
          id: "user",
          required: true,
        },
        {
          view: "text",
          label: "Password",
          name: "password",
          id: "password",
          type: "password",
          required: true,
        },
        {
          view: "button",
          css: "webix_primary",
          label: "Save",
          id: "saveBtnCta",
          click: function () {
            if (this.getFormView().validate()) {
              onsubmitCuenta();
            }
          },
        },
        {
          view: "button",
          css: "webix_primary",
          label: "Edit",
          id: "editBtnC",
          click: editC,
          hidden: true,
        },
        {
          view: "button",
          css: "webix_alert",
          label: "cancel",
          id: "clearBtnCta",
          click: limpiarCuentas,
        },
      ],
    },
    {
      view: "datatable",
      select: "row",
      id: "tablaCuenta",
      url: "http://localhost:3000/usuarios",
      columns: [
        {
          id: "name",
          header: "Usuarios",
          fillspace: true,
          sort: "string",
          select: "row",
        },
      ],
    },
    {
      view: "button",
      css: "webix_danger",
      label: "Delete",
      id: "deleteBtnC",
      click: deleteC,
      hidden: true,
    },
  ],
};
