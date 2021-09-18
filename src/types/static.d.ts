declare module "*.svg" {
  const ref: React.RefForwardingComponent<
    SVGSVGElement,
    React.SVGAttributes<SVGSVGElement>
  >;
  export default ref;
}

interface ImportMeta {
  // TODO: Import the exact .d.ts files from "esm-hmr"
  // https://github.com/pikapkg/esm-hmr
  hot: any;
}
