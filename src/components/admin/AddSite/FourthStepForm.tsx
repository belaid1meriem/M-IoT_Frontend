import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Info,
  Target,
  Package
} from "lucide-react"
import useFourthStepForm from "@/hooks/forms/AddSite/useFourthStepForm"
import DownloadTemplate from "@/components/DownloadTemplate"

export function FourthStepForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const {
    form,
    assetTrackingEnabled,
    onSubmit,
    prevStep
  } = useFourthStepForm()

  const getFileTypeIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'xlsx':
      case 'xls':
        return <FileText className="w-5 h-5 text-blue-600" />;
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
            <h2 className="text-2xl font-semibold">Assets Tracking</h2>
            <p className="text-muted-foreground">
              Configurez le suivi des objets et équipements du site
            </p>
          </div>

          {/* Asset Tracking Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Configuration du suivi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="assetTracking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Assets Tracking
                      </FormLabel>
                      <FormDescription>
                        Permet de suivre et gérer les objets et équipements de ce site
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Conditional File Upload */}
          {assetTrackingEnabled && (
            <>
              {/* Info Alert */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Importez la liste des objets à suivre depuis un fichier Excel. Le fichier sera traité par le serveur.
                </AlertDescription>
              </Alert>
              <DownloadTemplate/>
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Import des objets suivis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="trackedObjectsFile"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Fichier des objets suivis</FormLabel>
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
                                    Fichier Excel (.xlsx, .xls) - Max 10MB
                                  </p>
                                </div>
                                <Input
                                  {...field}
                                  type="file"
                                  accept=".xlsx,.xls"
                                  multiple={false}
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
            </>
          )}

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