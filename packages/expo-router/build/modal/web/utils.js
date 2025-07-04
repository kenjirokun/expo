"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModalPresentation = isModalPresentation;
exports.isTransparentModalPresentation = isTransparentModalPresentation;
// Helper to determine if a given screen should be treated as a modal-type presentation
function isModalPresentation(options) {
    const presentation = options?.presentation;
    return (presentation === 'modal' ||
        presentation === 'formSheet' ||
        presentation === 'fullScreenModal' ||
        presentation === 'containedModal' ||
        presentation === 'transparentModal' ||
        presentation === 'containedTransparentModal');
}
function isTransparentModalPresentation(options) {
    const presentation = options?.presentation;
    return presentation === 'transparentModal' || presentation === 'containedTransparentModal';
}
//# sourceMappingURL=utils.js.map