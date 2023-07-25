import { Tree, TreeNode } from 'react-organizational-chart'
import { styled } from 'styled-components'

const StyleLabel = styled.div`
    padding: 15px 35px;
    margin: 0px 20px;
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
    margin: 0px 20px;
    justify-content: center;
    font-size: 32px;
    color: #9a9fad;
    height: 80px;
    font-weight: bold;
    border: 2px solid #9a9fad;
    border-radius: 10px;
`

const OrganigrammeTree = ({ isMetierChecked }) => (
    <Tree
        lineWidth={'2px'}
        lineColor={'#B1BAC7'}
        lineBorderRadius={'10px'}
        label={
            <StyleLabel>
                <LabelContainer>
                    <SpanNamed>Lisa PERLANT</SpanNamed>
                    {isMetierChecked && (
                        <SpanPost>Directrice générale</SpanPost>
                    )}
                </LabelContainer>
            </StyleLabel>
        }
    >
        <TreeNode
            label={
                <StyleLabel>
                    <LabelContainer>
                        <SpanNamed>Jacques LISIER</SpanNamed>
                        {isMetierChecked && (
                            <SpanPost>Secrétariat général</SpanPost>
                        )}
                    </LabelContainer>
                </StyleLabel>
            }
        >
            <TreeNode
                label={
                    <StyleLabel>
                        <LabelContainer>
                            <SpanNamed>Pedro MARTANI</SpanNamed>
                            {isMetierChecked && (
                                <SpanPost>Directeur de production</SpanPost>
                            )}
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
                            {isMetierChecked && (
                                <SpanPost>Directrice RH</SpanPost>
                            )}
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
                            {isMetierChecked && (
                                <SpanPost>Directeur commercial</SpanPost>
                            )}
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
                            {isMetierChecked && (
                                <SpanPost>
                                    Directrice admin et juridique
                                </SpanPost>
                            )}
                        </LabelContainer>
                    </StyleLabel>
                }
            >
                <TreeNode label={<DivAdd>+</DivAdd>} />
            </TreeNode>
        </TreeNode>
    </Tree>
)

export default OrganigrammeTree
