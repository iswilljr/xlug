module.exports = {
  "*.{js,jsx,ts,tsx}": () => ["yarn typecheck", "yarn lint --fix"],
  "*": () => "yarn format",
};
