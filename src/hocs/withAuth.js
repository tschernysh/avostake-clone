
export const withAuth = Component => {

  return props => {


    return <Component ethereumClient={ethereumClient} projectId={projectId} {...props} />
  }
}
