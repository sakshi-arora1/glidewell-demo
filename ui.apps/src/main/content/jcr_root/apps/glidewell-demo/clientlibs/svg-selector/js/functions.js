

(function () {

    let toggleColour = function (element, fieldModel) {
        element.setAttribute("fill", fieldModel.checked ? "#EDCDA8" : "#FCFCFC");
        element.parentElement.querySelectorAll('[data-svg-border="' + fieldModel.name + '"]').forEach((borderElement) => {
            borderElement.setAttribute("fill", fieldModel.checked ? "#5B8CDD" : "#BDC8D6");
        });
    };

    let handleFormInitialization = function(event) {
        let formContainerView = event.detail;
        let formElement = formContainerView.getFormElement();
        let svgImageComponents = formElement.querySelectorAll('[data-cmp-is="adaptiveFormSvg"]');
        let handleSvgImage = function(svgImage) {
            let svgContainerModelId = svgImage.closest('[data-cmp-is="adaptiveFormPanel"]').getAttribute("id");
            let svgContainerModel = formContainerView.getModel(svgContainerModelId);
            let svgSelectorModel = svgContainerModel.parent;
            let accessibleContainerModel = svgSelectorModel.items[1];
            accessibleContainerModel.items.forEach((fieldModel) => {
                if (fieldModel.properties['svg-linked-checkbox']) {
                    let fieldName = fieldModel.name;
                    svgImage.querySelectorAll('[data-svg-af-field="' + fieldName + '"]').forEach((svgPathField) => {
                        svgPathField.addEventListener("click", (clickEvent) => {
                            fieldModel.checked = !fieldModel.checked;
                        });
                        fieldModel.subscribe((action) => {
                            let changes = action.payload.changes;
                            changes.forEach(change => {
                                if (change.propertyName === 'checked') {
                                    toggleColour(svgPathField, fieldModel);
                                }
                            });
                        });
                    });
                }
            });
        };
        svgImageComponents.forEach(handleSvgImage);
    };

    document.addEventListener("AF_FormContainerInitialised", handleFormInitialization);

})();
