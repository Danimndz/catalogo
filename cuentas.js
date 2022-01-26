//const user = sessionStorage.getItem("usuario");
const limpiarCuentas = () => {
  $$("cuentasForm").clear();
  $$("editBtnC").hide();
  $$("saveBtnCta").show();
  $$("deleteBtnC").hide();
};

const deleteC = () => {
  let pToDelete = $$("cuentasForm").getValues();
  webix
    .ajax()
    .del(`http://localhost:3000/usuarios/${pToDelete.id}`, 
    pToDelete)
    .then((res) => {
      $$("tablaCuenta").clearAll();
      $$("tablaCuenta").parse(res.json());
      $$("deleteBtnC").hide();
      $$("saveBtnCta").show();
      $$("editBtnC").hide();
    });
};

const editC = () => {
  let pToEdit = $$("cuentasForm").getValues();
  webix
    .ajax()
    .put(`http://localhost:3000/usuarios/${pToEdit.id}`, pToEdit)
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
  
  webix
    .ajax()
    .post(`http://localhost:3000/usuarios`, newCuenta)
    .then(function (content) {
      $$("tablaCuenta").clearAll();
      $$("tablaCuenta").parse(content.json());
    });
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
          name: "user",
          id: "user",
          required: true,
        },
        

        {
          view: "text",
          label: "Password",
          name: "password",
          id: "password",
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
          css: "webix_danger",
          label: "Delete",
          id: "deleteBtnC",
          click: deleteC,
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
      select:"row",
      id: "tablaCuenta",
      url: "http://localhost:3000/usuarios",
      columns: [
        {
          id: "user",
          header: "Usuarios",
          fillspace: true,
          sort: "string",
          select: "row",
        },
        /*{
          id: "password",
          header: "Contraseña",
          fillspace: true,
          sort: "string",
          type:"password",
          select: "row",
        },*/
        
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
