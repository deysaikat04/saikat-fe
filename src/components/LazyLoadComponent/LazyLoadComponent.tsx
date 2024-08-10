import React from "react";

interface Props {
  title?: string;
  removePadding?: boolean;
  Component: any;
  fallback?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null;
}

const LazyLoadComponent = ({
  Component,
  fallback = <p>Loading...</p>,
  title,
  removePadding,
}: Props) => {
  return (
    <React.Suspense fallback={fallback}>
      <div
        className={`${
          !removePadding ? "px_40 py_40 left-padding" : "no-padding"
        } page_container`}
      >
        {title && <h1 className="mt_0 mb_16 page_title">{title}</h1>}
        <Component />
      </div>
    </React.Suspense>
  );
};

export default LazyLoadComponent;
