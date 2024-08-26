export const checkImageURL = (url:string):boolean => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

// const checkImagURL is a named export. # 2023-10-21
// Named exports allow for multiple functions, objects, or variables to be exported from the same module.
// This contrasts with default exports, where you can export only one item.