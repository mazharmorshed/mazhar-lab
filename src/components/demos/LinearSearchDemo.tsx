import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createSearchArray, runLinearSearch } from '@/lib/algorithms/searching'
import { useState } from "react"

export function LinearSearchDemo() {
    const [results, setResults] = useState<{
        array: number[];
        found: boolean;
        index: number;
        time: number;
    } | null>(null);
    const [size, setSize] = useState<string>("");
    const [testCase, setTestCase] = useState<string>("");
    const [target, setTarget] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!size || !testCase) return;

        setIsLoading(true);
        setError(null);

        try {
            const arraySize = parseInt(size);
            const array = createSearchArray(arraySize, 'sorted');
            let searchTarget: number;

            switch (testCase) {
                case 'best':
                    searchTarget = array[0];
                    break;
                case 'worst':
                    searchTarget = arraySize * 2;
                    break;
                default:
                    searchTarget = parseInt(target);
            }

            const { found, index, executionTime } = await runLinearSearch(array, searchTarget);
            setResults({ array, found, index, time: executionTime });
        } catch (err) {
            console.error('Error running search:', err);
            setError('Failed to run search. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestCaseChange = (value: string) => {
        setTestCase(value);
        if (size) {
            const arraySize = parseInt(size);
            switch (value) {
                case 'best':
                    setTarget('0');
                    break;
                case 'worst':
                    setTarget(String(arraySize * 2));
                    break;
                case 'average':
                    setTarget('');
                    break;
            }
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label>Array Size</Label>
                        <Select value={size} onValueChange={setSize}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10 elements</SelectItem>
                                <SelectItem value="100">100 elements</SelectItem>
                                <SelectItem value="1000">1,000 elements</SelectItem>
                                <SelectItem value="10000">10,000 elements</SelectItem>
                                <SelectItem value="100000">100,000 elements</SelectItem>
                                <SelectItem value="1000000">1,000,000 elements</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Test Case</Label>
                        <Select value={testCase} onValueChange={handleTestCaseChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select test case" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="best">Best Case (First Element)</SelectItem>
                                <SelectItem value="average">Average Case (Random)</SelectItem>
                                <SelectItem value="worst">Worst Case (Not Found)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Target Value</Label>
                        <Input
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            disabled={testCase !== 'average'}
                            placeholder="Enter target value"
                        />
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !size || !testCase || (testCase === 'average' && !target)}
                >
                    {isLoading ? 'Running...' : 'Run Search'}
                </Button>

                {error && (
                    <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
                        {error}
                    </div>
                )}
            </form>

            {results && (
                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Input Array Preview</h4>
                        <pre className="text-sm text-muted-foreground">
                            [{results.array.slice(0, 10).join(', ')}{results.array.length > 10 ? ', ...' : ''}] ({results.array.length.toLocaleString()} elements)
                        </pre>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Result</div>
                            <div className={`font-medium ${results.found ? 'text-success' : 'text-destructive'}`}>
                                {results.found ? 'Found' : 'Not Found'}
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Index</div>
                            <div className="font-medium">
                                {results.index === -1 ? 'N/A' : results.index}
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Time</div>
                            <div className="font-medium">
                                {results.time.toFixed(2)}ms
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
} 