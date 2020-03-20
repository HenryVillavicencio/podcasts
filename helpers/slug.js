import slugify from "slugify";

const slug = name => {
  return slugify(name, { lower: true }).replace(/[ˆ\W\-]+/g, "");
};

export default slug;
