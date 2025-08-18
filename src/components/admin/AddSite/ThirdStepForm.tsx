import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Upload, 
  FileText, 
  CheckCircle, 
} from "lucide-react"
import useThirdStepForm from "@/hooks/forms/AddSite/useThirdStepForm"
import DownloadTemplate from "@/components/DownloadTemplate"

export function ThirdStepForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const {
    form,
    onSubmit,
    prevStep
  } = useThirdStepForm()

  const getFileTypeIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'csv':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'json':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };


  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={onSubmit}
        {...props}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Import des Machines</h2>
            <p className="text-muted-foreground">
              Importez la liste des machines depuis un fichier Excel
            </p>
          </div>
          <DownloadTemplate/>
          
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Import du fichier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="machinesFile"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Fichier des machines</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Cliquez pour importer</span> ou glissez-déposez
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Importer un fichier .xlsx, .xls (Max 10MB)
                              </p>
                            </div>
                            <Input
                              {...field}
                              type="file"
                              accept=".xlsx,.xls"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                onChange(file);
                              }}
                            />
                          </label>
                        </div>

                        {/* File Info */}
                        {value && (
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            {getFileTypeIcon(value.name)}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{value.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(value.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              ← Retour
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
            >
              Continuer →
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}