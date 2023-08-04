type TitleProp =  {
  className? : string,
  txt : string
};

export const Title : React.FunctionComponent<TitleProp>= ({className, txt}) => <h1 className={className}>{txt}</h1>