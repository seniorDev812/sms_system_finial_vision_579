import React, { useState, useEffect } from "react";
import { ClientLayout } from "../../components/layouts/ClientLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { FileText, Plus, Edit, Trash2, Tag, Save, X, Copy } from "lucide-react";
import { useClientHook } from "../../hooks/useClientHook";

export default function ContentTemplates() {
  const [templates, setTemplates] = useState([
    {
      id: "1",
      name: "Welcome Message",
      content:
        "Welcome {{name}}! Thank you for joining {{company}}. Your account is now active.",
      placeholders: ["name", "company"],
      type: "welcome",
      createdDate: "2024-01-10",
    },
    {
      id: "2",
      name: "Promotional Offer",
      content:
        "Hi {{name}}! Get {{discount}}% off on your next purchase. Use code {{code}} before {{date}}.",
      placeholders: ["name", "discount", "code", "date"],
      type: "promotion",
      createdDate: "2024-01-15",
    },
    {
      id: "3",
      name: "Appointment Reminder",
      content:
        "Hello {{name}}, reminder for your appointment on {{date}} at {{time}}. Reply CONFIRM to confirm.",
      placeholders: ["name", "date", "time"],
      type: "reminder",
      createdDate: "2024-01-18",
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    type: "general",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const { getTemplates, createNewTemplage, updateTemplate, deleteOneTemplate } =
    useClientHook();

  const availablePlaceholders = [
    { name: "name", description: "Customer name" },
    { name: "company", description: "Company name" },
    { name: "discount", description: "Discount percentage" },
    { name: "code", description: "Promotional code" },
    { name: "date", description: "Date value" },
    { name: "time", description: "Time value" },
    { name: "amount", description: "Amount value" },
    { name: "phone", description: "Phone number" },
    { name: "email", description: "Email address" },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "welcome":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "promotion":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "reminder":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const getAllTemplates = async () => {
    try {
      let res = await getTemplates();
      setTemplates(res.data.templates);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const extractPlaceholders = (content) => {
    const matches = content.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map((match) => match.replace(/[{}]/g, "")) : [];
  };

  const insertPlaceholder = (placeholderName) => {
    const placeholder = `{{${placeholderName}}}`;
    const isEditing = editingTemplate !== null;

    if (isEditing && editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        content: editingTemplate.content + placeholder,
      });
    } else {
      setNewTemplate({
        ...newTemplate,
        content: newTemplate.content + placeholder,
      });
    }
  };

  const handleSaveTemplate = async (id) => {
    try {
      const content = editingTemplate
        ? editingTemplate.content
        : newTemplate.content;
      const tags = extractPlaceholders(content);

      if (editingTemplate) {
        let updateData = { ...editingTemplate, tags };
        let res = await updateTemplate(updateData, id);
        setTemplates(
          templates.map((t) =>
            t.id === res.data.template.id ? { ...res.data.template } : t
          )
        );
        setEditingTemplate(null);
      } else {
        const _newTemplate = {
          name: newTemplate.name,
          content: newTemplate.content,
          tags: tags,
          type: newTemplate.type,
        };
        let res = await createNewTemplage(_newTemplate);
        setTemplates([...templates, res.data.template]);
        setNewTemplate({ name: "", content: "", type: "general" });
        setIsCreating(false);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleDeleteTemplate = async (id) => {
    try {
      await deleteOneTemplate(id);
      getAllTemplates();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleDuplicateTemplate = async (template) => {
    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdDate: new Date().toISOString().split("T")[0],
    };
    try {
      let res = await createNewTemplage(duplicated);
      setTemplates([...templates, res.data.template]);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Content Templates</h1>
                <p className="text-violet-100 text-lg">
                  Create and manage SMS message templates
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{templates.length}</div>
                <div className="text-violet-100">Total Templates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {templates.filter((t) => t.type === "welcome").length}
                </div>
                <div className="text-violet-100">Welcome</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {templates.filter((t) => t.type === "promotion").length}
                </div>
                <div className="text-violet-100">Promotional</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {templates.filter((t) => t.type === "reminder").length}
                </div>
                <div className="text-violet-100">Reminders</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-violet-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">SMS Templates</CardTitle>
                    <CardDescription className="text-violet-100">
                      Manage your message templates
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-xl border-2 border-violet-200 focus:border-violet-500"
                  />
                </div>

                <div className="space-y-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-violet-900">
                              {template.name}
                            </h3>
                            <Badge
                              className={`${getCategoryColor(
                                template.type
                              )} text-white`}
                            >
                              {template.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">
                            {template.content}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {template.tags &&
                              template.tags.map((placeholder) => (
                                <Badge
                                  key={placeholder}
                                  variant="outline"
                                  className="bg-white text-violet-700 border-violet-300"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {placeholder}
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDuplicateTemplate(template)}
                            className="border-violet-300 text-violet-700 hover:bg-violet-50"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingTemplate(template)}
                            className="border-violet-300 text-violet-700 hover:bg-violet-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {template && template.created_at}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {(isCreating || editingTemplate) && (
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-indigo-50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                  <CardTitle className="text-xl flex items-center justify-between">
                    <span>
                      {editingTemplate ? "Edit Template" : "Create Template"}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingTemplate(null);
                        setNewTemplate({
                          name: "",
                          content: "",
                          type: "general",
                        });
                      }}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Template Name
                    </label>
                    <Input
                      placeholder="Enter template name"
                      value={
                        editingTemplate
                          ? editingTemplate.name
                          : newTemplate.name
                      }
                      onChange={(e) => {
                        if (editingTemplate) {
                          setEditingTemplate({
                            ...editingTemplate,
                            name: e.target.value,
                          });
                        } else {
                          setNewTemplate({
                            ...newTemplate,
                            name: e.target.value,
                          });
                        }
                      }}
                      className="rounded-xl border-2 border-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Category
                    </label>
                    <select
                      value={
                        editingTemplate
                          ? editingTemplate.type
                          : newTemplate.type
                      }
                      onChange={(e) => {
                        if (editingTemplate) {
                          setEditingTemplate({
                            ...editingTemplate,
                            type: e.target.value,
                          });
                        } else {
                          setNewTemplate({
                            ...newTemplate,
                            type: e.target.value,
                          });
                        }
                      }}
                      className="w-full rounded-xl border-2 border-indigo-200 focus:border-indigo-500 p-3"
                    >
                      <option value="general">General</option>
                      <option value="welcome">Welcome</option>
                      <option value="promotion">Promotion</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Message Content
                    </label>
                    <Textarea
                      placeholder="Enter your message template..."
                      value={
                        editingTemplate
                          ? editingTemplate.content
                          : newTemplate.content
                      }
                      onChange={(e) => {
                        if (editingTemplate) {
                          setEditingTemplate({
                            ...editingTemplate,
                            content: e.target.value,
                          });
                        } else {
                          setNewTemplate({
                            ...newTemplate,
                            content: e.target.value,
                          });
                        }
                      }}
                      className="min-h-[120px] rounded-xl border-2 border-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  <Button
                    onClick={() => handleSaveTemplate(editingTemplate && editingTemplate.id)}
                    disabled={
                      (editingTemplate &&
                        (!editingTemplate.name || !editingTemplate.content)) ||
                      (!editingTemplate &&
                        (!newTemplate.name || !newTemplate.content))
                    }
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-xl py-3"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {editingTemplate ? "Update Template" : "Save Template"}
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="text-xl">
                  Available Placeholders
                </CardTitle>
                <CardDescription className="text-green-100">
                  Click to insert into template
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-3">
                  {availablePlaceholders.map((placeholder) => (
                    <div
                      key={placeholder.name}
                      onClick={() => insertPlaceholder(placeholder.name)}
                      className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-green-800">
                            {`{{${placeholder.name}}}`}
                          </div>
                          <div className="text-sm text-green-600">
                            {placeholder.description}
                          </div>
                        </div>
                        <Tag className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
