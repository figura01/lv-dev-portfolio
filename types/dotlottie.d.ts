import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    src?: string;
    autoplay?: boolean;
    loop?: boolean;
  }

  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
