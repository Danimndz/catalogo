const limpiarCuentas = () => {
  $$("cuentasForm").clear;
  $$("editBtnC").hide();
  $$("saveBtnCta").show();
  $$("deleteBtnC").hide();
};

const deleteC = () => {
  let values = $$("cuentasForm").getValues();
  webix
    .ajax()
    .del(`http://alumnos01.enlacenet.net:8005/DelCuentas/${user}`, values)
    .then((res) => {
      $$("tablaCuenta").clearAll();
      $$("tablaCuenta").parse(res.json());
      $$("deleteBtnC").hide();
      $$("saveBtnCta").show();
      $$("editBtnC").hide();
    });
};

const editC = () => {
  let values = $$("cuentasForm").getValues();
  webix
    .ajax()
    .put(`http://alumnos01.enlacenet.net:8005/UpdateCuentas/${user}`, values)
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
    .post(`http://alumnos01.enlacenet.net:8005/postCuenta/${user}`, newCuenta)
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
          label: "Banco",
          name: "banco",
          value: "1",
          options: [
            "HSBC",
            "SANTANDER",
            "BANAMEX",
            "SCOTIABANK",
            "BANORTE",
            "BANCO AZTECA",
            "BANCO DEL BAJIO",
            "INBURSA",
            "BANCOMER",
            "OTRO",
          ],
          view: "combo",
          required: true,
        },
        {
          view: "text",
          label: "No. Cuenta",
          name: "noCuenta",
          id: "noCuenta",
          required: true,
          validate: function (val) {
            return !isNaN(val * 1);
          },
        },
        {
          view: "text",
          name: "_id",
          id: "idC",
          hidden: true,
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
      columns: [
        {
          id: "banco",
          header: "Banco",
          fillspace: true,
          sort: "string",
          select: "row",
        },
        {
          id: "noCuenta",
          header: "Numero de cuenta",
          fillspace: true,
          sort: "string",
        },
      ],
      view: "datatable",
      id: "tablaCuenta",
      url: `http://alumnos01.enlacenet.net:8005/tablaCuentas/${user}`,
      select: "row",
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
