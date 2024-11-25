sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/Label",
    "sap/ui/core/Core",
    "sap/m/MessageBox"
], (Controller, Dialog, Input, Button, Text, Label, Core,MessageBox) => {
    "use strict";
    var that;
        var appModulePath;
    return Controller.extend("project1securitytest.controller.View1", {
        onInit() {
            that = this;

            appModulePath = this.getOwnerComponent().getManifestObject()._oBaseUri._parts.path;
        },
        read: function () {
            let sUrl = appModulePath + "odata/v4/materials/Materials";

            var oTextModel = this.getOwnerComponent().getModel("textModel");
            var oTable = this.getView().byId("idTabel01");
            this.getView().setBusyIndicatorDelay(0);
            this.getView().setBusy(true);


            jQuery.ajax({
                url: sUrl,
                method: "GET",
                success: function (oResponse) {

                    debugger;
                    oTextModel.setData(oResponse.value);
                    oTable.setModel(oTextModel);
                    oTable.bindRows("textModel>/");
                    that.getView().setBusy(false);

                    MessageBox.success("Read Operation Performed!!");

                },
                error: function (oError) {
                    debugger;
                    that.getView().setBusy(false);
                    MessageBox.error("Error Occured");

                }
            });

        },
        update: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("idTabel01");
            let index = oTable.getSelectedIndex();
            let selPath = '/' + index;
            var selectedObject = oTable.getModel().getProperty(selPath);
            //var sUrl = appModulePath + "odata/v4/materials/Materials/" + selectedObject.ID;
            var payload = {};
            payload.ID = selectedObject.ID;
            payload.Name = selectedObject.Name;
            payload.Group = selectedObject.Group;

           


            if (!this.oDraggableDialog1) {
                this.oDraggableDialog1 = new Dialog({
                    title: "Update Material",
                    contentWidth: "550px",
                    contentHeight: "300px",
                    draggable: true,
                    content: [new Label({ text: "Material ID" }), new Input("idMNumber1", { value: payload.ID, editable: false }), new Label({ text: "Name" }), new Input("idMName1", { value: payload.Name }), new Label({ text: "Group" }), new Input("idMUnitinStock1", { value: payload.Group })],
                    endButton: new Button({
                        text: "Update",
                        press: function () {
                            debugger;
                            payload.ID = Core.byId("idMNumber1").getValue();
                            payload.Name = Core.byId("idMName1").getValue();
                            payload.Group = Core.byId("idMUnitinStock1").getValue();
                        
                            var sUrl = appModulePath + "odata/v4/materials/Materials/" + payload.ID;
                            jQuery.ajax({
                                url: sUrl,
                                method: "PATCH",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify(payload),
                                success: function (oResponse) {
                                    debugger;
                                    MessageBox.success("Record Updated!!");
                                },
                                error: function (oError) {
                                    debugger;
                                    MessageBox.error("Error Occured");

                                }
                            });

                            this.oDraggableDialog1.close();

                        }.bind(this)
                    })
                });

                //to get access to the controller's model
                this.getView().addDependent(this.oDraggableDialog1);
            }else{
                Core.byId("idMNumber1").setValue(payload.ID);
                Core.byId("idMName1").setValue(payload.Name);
                Core.byId("idMUnitinStock1").setValue(payload.Group);
        

            }

            this.oDraggableDialog1.open();

        },            create: function () {
            if (!this.oDraggableDialog) {
                this.oDraggableDialog = new Dialog({
                    title: "Create Material",
                    contentWidth: "550px",
                    contentHeight: "300px",
                    draggable: true,
                    content: [new Label({ text: "Material ID" }), new Input("idMNumber",{  editable: false }), new Label({ text: "Name" }), new Input("idMName"), new Label({ text: "Group" }), new Input("idMUnitinStock")],
                    endButton: new Button({
                        text: "Create",
                        press: function () {
                            debugger;
                            var sUrl = appModulePath + "odata/v4/materials/Materials";
                            var payload = {};
                            // payload.ID = parseInt(Core.byId("idMNumber").getValue());
                            payload.Name = Core.byId("idMName").getValue();
                            payload.Group = Core.byId("idMUnitinStock").getValue();
                            // payload.IsAvailable = JSON.parse(Core.byId("idAvail").getValue());

                            jQuery.ajax({
                                url: sUrl,
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify(payload),
                                success: function (oResponse) {
                                    debugger;
                                    MessageBox.success("Record Created!!");
                                },
                                error: function (oError) {
                                    debugger;
                                    MessageBox.error("Error Occured");

                                }
                            });

                            this.oDraggableDialog.close();

                        }.bind(this)
                    })
                });

                //to get access to the controller's model
                this.getView().addDependent(this.oDraggableDialog);
            }
            else{

                Core.byId("idMNumber").setValue();
                Core.byId("idMName").setValue();
                Core.byId("idMUnitinStock").setValue();
                // Core.byId("idAvail").setValue();
            }

            this.oDraggableDialog.open();
        },
    });
});