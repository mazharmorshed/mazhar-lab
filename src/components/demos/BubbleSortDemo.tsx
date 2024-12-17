import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createSortArray, runBubbleSort } from '@/lib/algorithms/sorting'
import { useState } from "react"

export function BubbleSortDemo() {
    const [results, setResults] = useState<{
        inputArray: number[];
        sortedArray: number[];
        time: number;
    } | null>(null);
    const [size, setSize] = useState<string>("");
    const [testCase, setTestCase] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!size || !testCase) return;

        setIsLoading(true);
        setError(null);

        try {
            const arraySize = parseInt(size);
            const array = createSortArray(arraySize, testCase as 'sorted' | 'random' | 'reversed');
            const { sortedArray, executionTime } = await runBubbleSort(array);
            
            setResults({
                inputArray: array,
                sortedArray,
                time: executionTime
            });
        } catch (err) {
            console.error('Error running sort:', err);
            setError('Failed to run sort. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                        <Select value={testCase} onValueChange={setTestCase}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select test case" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sorted">Best Case (Already Sorted)</SelectItem>
                                <SelectItem value="random">Average Case (Random)</SelectItem>
                                <SelectItem value="reversed">Worst Case (Reverse Sorted)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !size || !testCase}
                >
                    {isLoading ? 'Running...' : 'Run Sort'}
                </Button>

                {error && (
                    <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
                        {error}
                    </div>
                )}
            </form>

            {results && (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Input Array Preview</h4>
                            <pre className="text-sm text-muted-foreground">
                                [{results.inputArray.slice(0, 10).join(', ')}{results.inputArray.length > 10 ? ', ...' : ''}] ({results.inputArray.length.toLocaleString()} elements)
                            </pre>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Sorted Array Preview</h4>
                            <pre className="text-sm text-muted-foreground">
                                [{results.sortedArray.slice(0, 10).join(', ')}{results.sortedArray.length > 10 ? ', ...' : ''}] ({results.sortedArray.length.toLocaleString()} elements)
                            </pre>
                        </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Array Size</div>
                            <div className="font-medium">
                                {parseInt(size).toLocaleString()} elements
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Execution Time</div>
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