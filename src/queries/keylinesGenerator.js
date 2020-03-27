import { execute } from "../actions/GafferActions"

export const convert = async () => {

    await execute(
        {
            "class": "uk.gov.gchq.gaffer.operation.OperationChain",
            "operations": [
                {
                    "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
                },
                {
                    "class": "uk.gov.gchq.gaffer.operation.impl.generate.GenerateObjects",
                    "elementGenerator": {
                        "class": "uk.gov.gchq.gaffer.keylines.KeylinesGenerator"
                    }
                }
            ]
        }
    );

}