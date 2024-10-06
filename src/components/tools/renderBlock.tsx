import React from 'react'

export interface RenderBlockSectionDataProps {
  component: React.FunctionComponent
  componentName: string
  props?: object
  elementType?: keyof JSX.IntrinsicElements
  id?: string
  className?: string
}

export interface RenderBlockProps {
  sectionData: RenderBlockSectionDataProps
  key: number | string
}

/**
 * Render element by name, type and props
 */
export const renderBlock = (sectionData: RenderBlockProps['sectionData'], key: RenderBlockProps['key']) => {
  const { component, componentName, elementType = 'section', id, props: componentData, className } = sectionData
  const componentKey = `${componentName}-${key}`
  const WrapperBlock = elementType

  // const sectionId = formatString({ string: componentName })

  return (
    <section className={`w-full ${className}`} key={componentKey} data-component-name={componentName}>
      {React.createElement(component, { ...componentData })}
    </section>
  )
}
