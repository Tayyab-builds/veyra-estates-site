import { useState } from 'react'
import { FiEye, FiEdit2, FiTrash2, FiHome, FiCheckCircle, FiPlus } from 'react-icons/fi'
import { Link } from '../../router.jsx'
import {
  useProperties,
  updateProperty,
  deleteProperty,
  createProperty,
  isPropertyEdited,
  isPropertyAdded,
} from '../../data/propertyStore.js'
import RequireAdmin from '../../components/dashboard/RequireAdmin.jsx'
import AdminShell from '../../components/admin/AdminShell.jsx'
import DashboardCard from '../../components/dashboard/DashboardCard.jsx'
import PropertyEditModal from '../../components/admin/PropertyEditModal.jsx'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'
import Button from '../../components/Button.jsx'

const statusStyles = {
  'Available Now': 'bg-sage/20 text-plum',
  'Under Offer': 'bg-terracotta/15 text-terracotta-dark',
  Sold: 'bg-stone text-plum/60',
  'Off Market': 'bg-stone text-plum/60',
}

function PropertyRow({ property, onEdit, onDelete }) {
  return (
    <li className="flex flex-col gap-4 border-t border-stone py-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-32 w-full shrink-0 overflow-hidden sm:h-20 sm:w-28">
        <img src={property.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-display text-lg text-plum">{property.name}</h3>
          {isPropertyAdded(property.id) && (
            <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-[0.65rem] tracking-wide text-terracotta-dark">
              Added
            </span>
          )}
          {isPropertyEdited(property.id) && (
            <span className="rounded-full bg-olive/10 px-2 py-0.5 text-[0.65rem] tracking-wide text-olive-dark">
              Edited
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-sm text-plum/55">{property.location}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-plum/60">
          <span>{property.category}</span>
          <span>{property.purpose === 'Buy' ? 'For Sale' : 'For Rent'}</span>
          <span>
            {property.beds} bd · {property.baths} ba
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end sm:text-right">
        <span
          className={`rounded-full px-2.5 py-1 text-[0.7rem] tracking-wide ${
            statusStyles[property.availability] ?? 'bg-stone text-plum/60'
          }`}
        >
          {property.availability}
        </span>
        <p className="font-display text-base text-plum">{property.price}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 border-t border-stone pt-3 sm:border-t-0 sm:pt-0">
        <Link
          to={`/properties/${property.id}`}
          aria-label={`View ${property.name}`}
          className="flex h-9 w-9 items-center justify-center text-plum/55 transition-colors duration-300 hover:bg-parchment hover:text-plum"
        >
          <FiEye size={16} />
        </Link>
        <button
          type="button"
          onClick={() => onEdit(property)}
          aria-label={`Edit ${property.name}`}
          className="flex h-9 w-9 items-center justify-center text-plum/55 transition-colors duration-300 hover:bg-parchment hover:text-plum"
        >
          <FiEdit2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(property)}
          aria-label={`Delete ${property.name}`}
          className="flex h-9 w-9 items-center justify-center text-plum/55 transition-colors duration-300 hover:bg-terracotta/10 hover:text-terracotta-dark"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </li>
  )
}

function AdminProperties() {
  const properties = useProperties()
  const [editingProperty, setEditingProperty] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingProperty, setDeletingProperty] = useState(null)
  const [notice, setNotice] = useState('')

  const showNotice = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const handleSave = (values) => {
    updateProperty(editingProperty.id, values)
    setEditingProperty(null)
    showNotice('Property updated.')
  }

  const handleCreate = (values) => {
    createProperty(values)
    setIsCreating(false)
    showNotice('Property created.')
  }

  const handleDeleteConfirm = () => {
    deleteProperty(deletingProperty.id)
    setDeletingProperty(null)
  }

  return (
    <RequireAdmin>
      <AdminShell pageTitle="Properties">
        <section className="border border-stone bg-ivory p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">Listings</p>
              <h1 className="mt-2 font-display text-3xl leading-[1.1] text-plum sm:text-4xl">
                Manage Properties
              </h1>
              <p className="mt-3 max-w-lg leading-relaxed text-plum/60">
                View, edit, or remove listings. Changes here apply immediately to the public site.
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsCreating(true)}
              className="gap-2 px-5 py-2.5 text-xs"
            >
              <FiPlus size={15} aria-hidden="true" />
              Add Property
            </Button>
          </div>
        </section>

        {notice && (
          <div
            role="status"
            className="flex items-center gap-2.5 border border-olive/30 bg-olive/10 px-5 py-3 text-sm text-olive-dark"
          >
            <FiCheckCircle size={16} />
            {notice}
          </div>
        )}

        <DashboardCard eyebrow={`${properties.length} Listings`} title="All Properties">
          {properties.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-14 text-center">
              <FiHome size={22} className="text-plum/35" />
              <p className="max-w-sm text-sm leading-relaxed text-plum/60">
                Every property has been removed from the current listing set.
              </p>
            </div>
          ) : (
            <ul>
              {properties.map((property) => (
                <PropertyRow
                  key={property.id}
                  property={property}
                  onEdit={setEditingProperty}
                  onDelete={setDeletingProperty}
                />
              ))}
            </ul>
          )}
        </DashboardCard>
      </AdminShell>

      <PropertyEditModal
        property={editingProperty}
        mode="edit"
        open={Boolean(editingProperty)}
        onClose={() => setEditingProperty(null)}
        onSave={handleSave}
      />

      <PropertyEditModal
        property={null}
        mode="create"
        open={isCreating}
        onClose={() => setIsCreating(false)}
        onSave={handleCreate}
      />

      <ConfirmDialog
        open={Boolean(deletingProperty)}
        title="Delete this property?"
        description={
          deletingProperty
            ? `"${deletingProperty.name}" will be removed from every public listing. This can't be undone from the admin panel.`
            : ''
        }
        confirmLabel="Delete Property"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingProperty(null)}
      />
    </RequireAdmin>
  )
}

export default AdminProperties
