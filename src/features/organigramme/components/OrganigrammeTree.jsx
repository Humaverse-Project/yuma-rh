import { Tree, TreeNode } from 'react-organizational-chart'
import { styled } from 'styled-components'

const StyleLabel = styled.div`
    padding: 15px 50px;
    display: inline-block;
    border: 2px solid #317ac1;
`

const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const SpanNamed = styled.span`
    color: #585858;
    font-weight: bold;
`

const SpanPost = styled.span`
    color: #9a9fad;
`

const DivAdd = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #9a9fad;
    height: 80px;
    font-weight: bold;
    border: 2px solid #9a9fad;
    border-radius: 10px;
`

const StyledTreeExample = () => (
    <Tree
        lineWidth={'2px'}
        lineColor={'#B1BAC7'}
        lineBorderRadius={'10px'}
        label={
            <StyleLabel>
                <LabelContainer>
                    <SpanNamed>Lisa PERLANT</SpanNamed>
                    <SpanPost>Directrice générale</SpanPost>
                </LabelContainer>
            </StyleLabel>
        }
    >
        <TreeNode
            label={
                <StyleLabel>
                    <LabelContainer>
                        <SpanNamed>Jacques LISIER</SpanNamed>
                        <SpanPost>Secrétariat général</SpanPost>
                    </LabelContainer>
                </StyleLabel>
            }
        >
            <TreeNode
                label={
                    <StyleLabel>
                        <LabelContainer>
                            <SpanNamed>Pedro MARTANI</SpanNamed>
                            <SpanPost>Directeur de production</SpanPost>
                        </LabelContainer>
                    </StyleLabel>
                }
            >
                <TreeNode label={<DivAdd>+</DivAdd>} />
                <TreeNode label={<DivAdd>+</DivAdd>} />
            </TreeNode>
            <TreeNode
                label={
                    <StyleLabel>
                        <LabelContainer>
                            <SpanNamed>Emma MAGOLOU</SpanNamed>
                            <SpanPost>Directrice RH</SpanPost>
                        </LabelContainer>
                    </StyleLabel>
                }
            >
                <TreeNode label={<DivAdd>+</DivAdd>} />
            </TreeNode>
            <TreeNode
                label={
                    <StyleLabel>
                        <LabelContainer>
                            <SpanNamed>Idris ADARE</SpanNamed>
                            <SpanPost>Directeur commercial</SpanPost>
                        </LabelContainer>
                    </StyleLabel>
                }
            >
                <TreeNode label={<DivAdd>+</DivAdd>} />
            </TreeNode>
            <TreeNode
                label={
                    <StyleLabel>
                        <LabelContainer>
                            <SpanNamed>Megane PONTIRO</SpanNamed>
                            <SpanPost>Directrice admin et juridique</SpanPost>
                        </LabelContainer>
                    </StyleLabel>
                }
            >
                <TreeNode label={<DivAdd>+</DivAdd>} />
            </TreeNode>
        </TreeNode>
    </Tree>
)

export default StyledTreeExample