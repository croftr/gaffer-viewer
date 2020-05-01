export const commonEdgesTemplate = (edgeGroups) => {

    const template = {
        class: "uk.gov.gchq.gaffer.operation.OperationChain",
        operations: [
            {
                class: "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
                view: {
                    edges: { [edgeGroups[0]]: {} }
                }
            },
        ]
    }


    if (edgeGroups.length > 1) {
        edgeGroups.forEach((edge, index) => {
            if (index !== 0) {
                template.operations.push(
                    {
                        class: "uk.gov.gchq.gaffer.operation.impl.get.GetElements",
                        view: {
                            edges: { [edgeGroups[index]]: {} }
                        }
                    }
                )
            }
        })
    }

    const edges = edgeGroups.map((edge) => {
        return { [edge]: {} }
    })

    template.operations.push(
        {
            class: "uk.gov.gchq.gaffer.operation.impl.ForEach",
            operation: {
                class: "uk.gov.gchq.gaffer.operation.OperationChain",
                operations: [
                    { class: "uk.gov.gchq.gaffer.operation.impl.outout.ToSingletonList" },

                    {
                        class: "uk.gov.gchq.gaffer.operation.impl.get.GetElements",
                        view: {
                            edges
                        }
                    }
                ]
            }
        }
    )

    return template;

}
