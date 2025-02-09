'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Droplets, Sun, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export function FarmDetails() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Farm Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">General Information</h3>
              <div className="space-y-4">
                <DetailItem label="Farm Size" value="50 Acres" />
                <DetailItem
                  label="Farming Type"
                  value={
                    <Badge variant="outline" className="animate-pulse">
                      Organic
                    </Badge>
                  }
                />
                <DetailItem
                  label="Irrigation Method"
                  value={
                    <div className="flex gap-2">
                      <Droplets
                        className="w-5 h-5 text-blue-500"
                        aria-label="Water irrigation"
                      />
                      <Sun
                        className="w-5 h-5 text-yellow-500"
                        aria-label="Solar irrigation"
                      />
                    </div>
                  }
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Equipment</h3>
              <div className="flex flex-wrap gap-2">
                <EquipmentBadge>Tractor</EquipmentBadge>
                <EquipmentBadge>Harvester</EquipmentBadge>
                <EquipmentBadge>Irrigation System</EquipmentBadge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <CertificationCard
              icon={<Award className="w-8 h-8 text-green-500" />}
              title="Organic Certification"
              validUntil="Dec 2024"
            />
            <CertificationCard
              icon={<Award className="w-8 h-8 text-blue-500" />}
              title="Global GAP"
              validUntil="Mar 2025"
            />
            <CertificationCard
              icon={<Award className="w-8 h-8 text-purple-500" />}
              title="Fair Trade"
              validUntil="Jun 2024"
            />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About Farm</h3>
          <p className="text-muted-foreground">
            This farm has been operating since 1985 and has been certified
            organic since 2005. It specializes in sustainable farming practices
            and uses advanced technology for precision agriculture.
          </p>
          <ExpandButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-muted-foreground">
                  Our farm is committed to producing high-quality, organic crops while minimizing environmental impact. 
                  We employ crop rotation, natural pest control methods, and water-conserving irrigation systems to maintain soil health and biodiversity.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function EquipmentBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="cursor-pointer transition-all duration-300 hover:bg-primary hover:text-primary-foreground transform hover:scale-105">
      {children}
    </Badge>
  )
}

function CertificationCard({
  icon,
  title,
  validUntil,
}: {
  icon: JSX.Element
  title: string
  validUntil: string
}) {
  return (
    <div className="flex items-center p-4 border rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary bg-card">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">Valid until {validUntil}</p>
      </div>
    </div>
  )
}

function ExpandButton({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      {isExpanded ? (
        <>
          <span className="mr-2">Show Less</span>
          <ChevronUp className="w-4 h-4" />
        </>
      ) : (
        <>
          <span className="mr-2">Show More</span>
          <ChevronDown className="w-4 h-4" />
        </>
      )}
    </button>
  )
}

