(function () {
    
    let highlightToothElement = function (toothName) {
       document.querySelectorAll('[data-svg-af-field="' + toothName + '"]').forEach((element) => {
            element.setAttribute("fill", "#EDCDA8");
        });
        document.querySelectorAll('[data-svg-border="' + toothName + '"]').forEach((borderElement) => {
            borderElement.setAttribute("fill", "#5B8CDD");
        });
    };
    
    let navigateNextPanel = function() {
        setTimeout(function() {
            document.querySelectorAll('.cmp-adaptiveform-wizard__nav.cmp-adaptiveform-wizard__nav--next').forEach((nextElement) => {
              nextElement.click();
        	});
        }, 1000);
    };
    
    document.addEventListener("highlightTeeth", function(event) {
        let toothArray = event.detail;
        toothArray.forEach(highlightToothElement);
    });
    
    document.addEventListener("navigateNext", navigateNextPanel);
    
    let svgMap = {};
    
    svgMap.toothSelection = function (element, fieldModel) {
        const checkedColor = "#EDCDA8";
        const uncheckedColor = "#FCFCFC";
        let fillColor = element.getAttribute("fill");
        if ((fieldModel.checked && fillColor == checkedColor) || (!fieldModel.checked && fillColor == uncheckedColor)) {
            // elements already styled
            return;
        }
        
        element.parentElement.querySelectorAll('[data-svg-af-field="' + fieldModel.name + '"]').forEach((innerElement) => {
            innerElement.setAttribute("fill", fieldModel.checked ? checkedColor : uncheckedColor);
        });
        element.parentElement.querySelectorAll('[data-svg-border="' + fieldModel.name + '"]').forEach((borderElement) => {
            borderElement.setAttribute("fill", fieldModel.checked ? "#5B8CDD" : "#BDC8D6");
        });
    };
    
    svgMap.ponticSelection = function (element, fieldModel) {
        if (fieldModel.checked) {
        	element.setAttribute("fill", "#FCFCFC");
        }
        element.parentElement.querySelectorAll('[data-svg-border="' + fieldModel.name + '"]').forEach((borderElement) => {
            if (fieldModel.checked) {
                borderElement.setAttribute("stroke", "#BDC8D6");
                borderElement.setAttribute("fill", "none");
                borderElement.setAttribute("stroke-width", "5");
            	borderElement.setAttribute("stroke-dasharray", "5");
            }
        });
        navigateNextPanel();
    };

    let toggleColour = function (element, fieldModel) {
        let selectionName = fieldModel.parent.parent.name;
		if (svgMap[selectionName]) {
            svgMap[selectionName].call(this, element, fieldModel);
        } else {
            element.setAttribute("fill", fieldModel.checked ? "#bee8f6" : "#ffffff");
        }
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
                            if (fieldModel.enabled) {
                            	fieldModel.checked = !fieldModel.checked;
                            }
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
