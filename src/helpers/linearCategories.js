const linearCategories = (categories, option = []) => {
    for (let category of categories) {
        option.push({
            value: category._id,
            name: category.name,
            parentId: category.parentId,
            type: category.type
        });
        if (category.children.length > 0) {
            linearCategories(category.children, option)
        }
    }
    return option;
}

export default linearCategories;