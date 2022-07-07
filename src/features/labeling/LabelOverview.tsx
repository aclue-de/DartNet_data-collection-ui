import { Table, TableCell, TableHead, TableRow } from "@mui/material"

type Column = {
    name: string
}
const columns: readonly Column[] = [
    { name: "ThrowSequenceId" },
    { name: "Labelled" },
    { name: "Capture Date" },
]
const LabelOverview = () => {



    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableCell key={column.name}>{column.name}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
}

export default LabelOverview